import React, { useState } from 'react';
import styles from './FileUpload.module.css';
import { PDFDocument } from "pdf-lib";

import { usePage } from './PageContext';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const { setPage } = usePage();

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        setFilename(file.name);

        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            setPage(pdfDoc.getPageCount());
        };
        reader.readAsArrayBuffer(file);
    };
    
    return (
        <div className={styles.uploadContainer}>


            <div className={styles.uploadOptionContainer}>
                <input type="file" accept="application/pdf" onChange={handleFileUpload} className={styles.uploadFile} />
            </div>

            {filename && 
            <div className={styles.filename}>
                {filename}
            </div>}
            
            {file && (
                <iframe
                    src={URL.createObjectURL(file)}
                    title="PDF Preview"
                    className={styles.pdfPreview}
                />
            )}
        </div>
    );
};

export default FileUpload;