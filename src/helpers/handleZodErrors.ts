import { Path, UseFormSetError, FieldValues } from 'react-hook-form';
import { z } from 'zod';

export const handleZodErrors = <T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>
) => {
    if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
            const path = error.path.join('.') as Path<T>;
            setError(path, { type: 'manual', message: error.message });
        });
    }
};
