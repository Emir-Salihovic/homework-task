import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FieldErrors,
    FieldValues,
    Path,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { ZodSchema, z } from 'zod';

interface FormGeneratorProps<T extends FieldValues> {
    formTitle?: string;

    // Invalidate queries after mutation
    invalidateQueries?: string[];
    mutationKey: string[];
    validationSchema: ZodSchema<T>;

    useMutationFn: (data?: T) => Promise<void>;

    // Using a generic to make the form
    // work with multiple form data
    renderForm: (props: {
        register: UseFormRegister<T>;
        errors: FieldErrors<T>;
    }) => React.ReactNode;
}

const FormGenerator = <T extends FieldValues>({
    formTitle,
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

    const mutation = useMutation({
        mutationKey: [mutationKey],
        mutationFn: useMutationFn,
        onSuccess: async () => {
            toast.success('Form Submitted!');
            reset();

            if (invalidateQueries) {
                await queryClient.invalidateQueries({
                    queryKey: invalidateQueries,
                });
            }
        },
        onError: (err) => {
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    const path = error.path.join('.') as Path<T>;
                    setError(path, { type: 'manual', message: error.message });
                });
            }
        },
    });

    // Function to handle form submission
    const onSubmit: SubmitHandler<T> = async (data?: T) => {
        try {
            // Validate inputs
            validationSchema.parse(data);

            // If validation is ok, perform mutation
            await mutation.mutateAsync(data);

            // In the end clear the errors
            clearErrors();
        } catch (err) {
            // Do not clear the errors here,
            // allow the user to "recover"
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    const path = error.path.join('.') as Path<T>;
                    setError(path, { type: 'manual', message: error.message });
                });
            }
        }
    };

    // Show error text if failed
    if (mutation.isError) {
        return (
            <div className="text-center flex flex-col items-center gap-2 my-2">
                <span className="text-4xl text-red">Something went wrong!</span>

                <button
                    className="bg-primary text-white rounded-md p-2 w-[100px]"
                    onClick={() => {
                        mutation.reset();
                    }}
                >
                    Reset
                </button>
            </div>
        );
    }

    return (
        <form
            className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit) as () => void}
        >
            <h2 className="text-xl font-semibold text-center mb-2">
                {formTitle}
            </h2>
            {renderForm({ register, errors })}
            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray40"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default FormGenerator;
