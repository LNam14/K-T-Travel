import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });


const CustomQuillEditor: React.FC<any> = ({ onContentChange, value }) => {
    const [content, setContent] = useState("");

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: [] }],
            [{ color: [] }],
            ["code-block"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "align",
        "color",
        "code-block",
    ];

    const handleEditorChange = (newContent: any) => {
        setContent(newContent);
        onContentChange(newContent);
    };
    return (
        <main>
            <div className="h-full w-[90vw]">
                <QuillEditor
                    value={content}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    formats={quillFormats}
                    className="w-full h-[70%] mt-2 bg-white"
                    style={{ border: "1px solid #dedede", borderRadius: 5, top: 0 }}
                />
            </div>
        </main>
    );
};
export default CustomQuillEditor;