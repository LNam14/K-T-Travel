'use client';

import { formatFileSize } from '@edgestore/react/utils';
import CloseIcon from '@mui/icons-material/Close';
import BackupIcon from '@mui/icons-material/Backup';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
const variants = {
    base: 'relative rounded-md aspect-square flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
    image:
        'border-0 p-0 w-full h-full relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md',
    active: 'border-2',
    disabled:
        'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700',
    accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
    reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type FileState = {
    file: File | string;
    key: string; // used to identify the file in the progress callback
    progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
};

type InputProps = {
    className?: string;
    value?: FileState[];
    onChange?: (files: FileState[]) => void | Promise<void>;
    onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
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

const MultiImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { dropzoneOptions, value, className, disabled, onChange, onFilesAdded },
        ref,
    ) => {
        const [customError, setCustomError] = React.useState<string>();

        const imageUrls = React.useMemo(() => {
            if (value) {
                return value.map((fileState) => {
                    if (typeof fileState.file === 'string') {
                        // in case a url is passed in, use it to display the image
                        return fileState.file;
                    } else {
                        // in case a file is passed in, create a base64 url to display the image
                        return URL.createObjectURL(fileState.file);
                    }
                });
            }
            return [];
        }, [value]);

        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            accept: { 'image/*': [] },
            disabled,
            onDrop: (acceptedFiles) => {
                const files = acceptedFiles;
                setCustomError(undefined);
                if (
                    dropzoneOptions?.maxFiles &&
                    (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
                ) {
                    setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
                    return;
                }
                if (files) {
                    const addedFiles = files.map<FileState>((file) => ({
                        file,
                        key: Math.random().toString(36).slice(2),
                        progress: 'PENDING',
                    }));
                    void onFilesAdded?.(addedFiles);
                    void onChange?.([...(value ?? []), ...addedFiles]);
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
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '0.5rem',
                }}>
                    {/* Dropzone */}
                    {(!value || value.length < (dropzoneOptions?.maxFiles ?? 0)) && (
                        <div
                            {...getRootProps({
                                className: dropZoneClassName,
                            })}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            {/* Main File Input */}
                            <input ref={ref} {...getInputProps()} />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                color: 'black',
                                border: "1px dashed  black",
                                width: 400,
                                paddingTop: 20,
                                paddingBottom: 20,
                            }}>
                                <BackupIcon style={{ marginBottom: '0.5rem', height: '1.75rem', width: '1.75rem' }} />
                                <div style={{ color: 'black' }}>drag & drop to upload</div>
                                <div style={{ marginTop: '0.75rem' }}>
                                    <Button disabled={disabled}>Select</Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Images */}
                    {value?.map(({ file, progress }, index) => (
                        <div key={index} className={variants.image + ' aspect-square'} style={{ position: 'relative', width: 175 }}>
                            <img
                                style={{ height: 100, width: 180, borderRadius: '0.375rem', objectFit: 'cover' }}
                                src={imageUrls[index]}
                                alt={typeof file === 'string' ? file : file.name}
                            />

                            {/* Progress Bar */}
                            {typeof progress === 'number' && (
                                <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                    <CircleProgress progress={progress} />
                                </div>
                            )}
                            {/* Remove Image Icon */}
                            {imageUrls[index] && !disabled && progress === 'PENDING' && (
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    transform: 'translateY(-25%) translateX(25%)'
                                }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        void onChange?.(value.filter((_, i) => i !== index) ?? []);
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
                                    }} >
                                        <CloseIcon
                                            className="text-gray-500 dark:text-gray-400"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
                {/* Error Text */}
                <div className="mt-1 text-xs text-red-500">
                    {customError ?? errorMessage}
                </div>
            </div>
        );
    },
);
MultiImageDropzone.displayName = 'MultiImageDropzone';

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

export { MultiImageDropzone };

function CircleProgress({ progress }: { progress: number }) {
    const strokeWidth = 10;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    return (
        <div style={{
            position: 'relative',
            height: '4rem',
            width: '4rem',
        }}>
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'rotate(-90deg)',
                    width: '100%',
                    height: '100%',
                }}
                viewBox={`0 0 ${2 * (radius + strokeWidth)} ${2 * (radius + strokeWidth)}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className="text-gray-400"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                />
                <circle
                    className="text-white transition-all duration-300 ease-in-out"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={((100 - progress) / 100) * circumference}
                    strokeLinecap="round"
                    fill="none"
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                />
            </svg>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: 'white',
            }}>
                {Math.round(progress)}%
            </div>
        </div>

    );
}