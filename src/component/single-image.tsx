'use client';

import { formatFileSize } from '@edgestore/react/utils';
import UploadIcon from '@mui/icons-material/Upload';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import CloseIcon from '@mui/icons-material/Close';
const variants = {
    base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
    image:
        'border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md',
    active: 'border-2',
    disabled:
        'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700',
    accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
    reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

type InputProps = {
    width: any;
    height: number;
    className?: string;
    value?: File | string;
    onChange?: (file?: File) => void | Promise<void>;
    disabled?: boolean;
    dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
    fileTooLarge(maxSize: number) {
        return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
    },
    fileInvalidType() {
        return 'Invalid file type.';
    },
    tooManyFiles(maxFiles: number) {
        return `You can only add ${maxFiles} file(s).`;
    },
    fileNotSupported() {
        return 'The file is not supported.';
    },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { dropzoneOptions, width, height, value, className, disabled, onChange },
        ref,
    ) => {
        const imageUrl = React.useMemo(() => {
            if (typeof value === 'string') {
                return value;
            } else if (value) {
                return URL.createObjectURL(value);
            }
            return null;
        }, [value]);

        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            acceptedFiles,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            accept: { 'image/*': [] },
            multiple: false,
            disabled,
            onDrop: (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                    void onChange?.(file);
                }
            },
            ...dropzoneOptions,
        });

        // styling
        const dropZoneClassName = React.useMemo(
            () =>
                twMerge(
                    variants.base,
                    isFocused && variants.active,
                    disabled && variants.disabled,
                    imageUrl && variants.image,
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
                imageUrl,
                fileRejections,
                isDragAccept,
                isDragReject,
                disabled,
                className,
            ],
        );

        // error validation messages
        const errorMessage = React.useMemo(() => {
            if (fileRejections[0]) {
                const { errors } = fileRejections[0];
                if (errors[0]?.code === 'file-too-large') {
                    return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    return ERROR_MESSAGES.fileInvalidType();
                } else if (errors[0]?.code === 'too-many-files') {
                    return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
                } else {
                    return ERROR_MESSAGES.fileNotSupported();
                }
            }
            return undefined;
        }, [fileRejections, dropzoneOptions]);

        return (
            <div>
                <div
                    {...getRootProps({
                        className: dropZoneClassName,
                        style: {
                            width,
                            height,
                        },
                    })}
                >
                    {/* Main File Input */}
                    <input ref={ref} {...getInputProps()} />

                    {imageUrl ? (
                        // Image Preview
                        <img
                            style={{ height: 150, borderRadius: '0.375rem', objectFit: 'cover', marginLeft: 55 }}
                            src={imageUrl}
                            alt={acceptedFiles[0]?.name}
                        />
                    ) : (
                        // Upload Icon
                        <div style={{
                            display: 'flex', borderRadius: 5, border: "1px dashed  black", width: "100%", paddingTop: 20,
                            paddingBottom: 20, height: 150, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#a0aec0'
                        }}>
                            <UploadIcon className="mb-2 h-7 w-7" />
                            <div className="text-gray-400">drag & drop to upload</div>
                            <div style={{ marginTop: 20 }}>
                                <button disabled={disabled}>select</button>
                            </div>
                        </div>
                    )}

                    {/* Remove Image Icon */}
                    {imageUrl && !disabled && (
                        <div
                            style={{
                                position: 'absolute',

                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                void onChange?.(undefined);
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                height: '1.25rem',
                                width: '1.25rem',
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.375rem',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#a0aec0',
                                backgroundColor: '#ffffff',
                                transition: 'all 0.3s ease',
                                marginLeft: 50
                            }} >
                                <CloseIcon
                                    style={{ color: '#718096' }}
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Text */}
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            </div >
        );
    },
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    return (
        <button
            className={twMerge(
                // base
                'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
                // color
                'border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700',
                // size
                'h-6 rounded-md px-2 text-xs',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';

export { SingleImageDropzone };