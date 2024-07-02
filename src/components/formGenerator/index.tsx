import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FieldErrors,
    FieldValues,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { ZodSchema } from 'zod';

import { handleZodErrors } from '@homework-task/helpers/handleZodErrors';

/**
 * @description Props for the FormGenerator component.
 */
interface FormGeneratorProps<T extends FieldValues> {
    formTitle?: string;
    successMessage?: string;
    invalidateQueries?: string[];
    mutationKey: string[];
    validationSchema: ZodSchema<T>;
    useMutationFn: (data?: T) => Promise<void>;
    renderForm: (props: {
        register: UseFormRegister<T>;
        errors: FieldErrors<T>;
    }) => React.ReactNode;
}

/**
 * @description FormGenerator component generates a form based on the provided props and handles form submission.
 */
const FormGenerator = <T extends FieldValues>({
    formTitle,
    successMessage = 'Form Submitted!',
    invalidateQueries,
    validationSchema,
    renderForm,
    useMutationFn,
    mutationKey,
}: FormGeneratorProps<T>) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm<T>();

    /**
     * @description Mutation configuration to handle form submission using react-query.
     */
    const mutation = useMutation({
        mutationKey,
        mutationFn: useMutationFn,

        onSuccess: async () => {
            toast.success(successMessage);
            reset();
            if (invalidateQueries) {
                await queryClient.invalidateQueries({
                    queryKey: invalidateQueries,
                });
            }
        },
        onError: (error) => handleZodErrors(error, setError),
    });

    /**
     * @description Handles form submission by validating data and triggering the mutation.
     */
    const onSubmit: SubmitHandler<T> = async (formData?: T) => {
        try {
            validationSchema.parse(formData);
            await mutation.mutateAsync(formData);
            clearErrors();
        } catch (error) {
            handleZodErrors(error, setError);
        }
    };

    if (mutation.isError) {
        return (
            <div className="text-center flex flex-col items-center gap-2 my-2">
                <span className="text-4xl text-red-500">
                    Something went wrong!
                </span>
                <button
                    className="bg-primary text-white rounded-md p-2 w-[100px]"
                    onClick={() => mutation.reset()}
                >
                    Reset
                </button>
            </div>
        );
    }

    return (
        <form
            className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
            {formTitle && (
                <h2 className="text-xl font-semibold text-center mb-2">
                    {formTitle}
                </h2>
            )}
            {renderForm({ register, errors })}
            <div className="flex items-center justify-center mt-4">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray40"
                >
                    {mutation.isPending ? 'Submiting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default FormGenerator;
