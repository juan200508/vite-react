import React, { useState, useEffect } from "react";
import "./UploadPage.css";

type NullableFile = File | null;

export default function UploadPage(): JSX.Element {
    const [file, setFile] = useState<NullableFile>(null);
    const [status, setStatus] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        return () => {
        // limpiar object URL al desmontar
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files && e.target.files[0] ? e.target.files[0] : null;
        setFile(selected);
        setStatus("");

        if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        }

        if (selected && selected.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setStatus("Selecciona un archivo primero.");
            return;
        }

        // ejemplo de validación: tamaño máximo 5MB
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setStatus("El archivo excede el tamaño máximo (5 MB).");
            return;
        }

        setStatus("Subiendo...");

        try {
        // Si tienes backend, descomenta y ajusta la URL:
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("http://98.71.169.48:8000/upload/", {  // 👈 ajusta puerto si es otro
            method: "POST",
            body: formData,
            });

            if (res.ok) {
            const data = await res.json();
            setStatus(`✅ ${data.message}`);
            setFile(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }
            } else {
            const errorText = await res.text();
            setStatus(`❌ Error: ${res.status} - ${errorText}`);
            }

        } catch (err) {
            setStatus("Error en la subida: " + (err instanceof Error ? err.message : String(err)));
        }
    };

    return (
        <div className="upload-page">
            <form className="upload-form" onSubmit={handleSubmit}>
            <h1>Subir archivo</h1>

            <label htmlFor="fileInput" className="file-label">Selecciona un archivo</label>
            <input id="fileInput" type="file" onChange={handleFileChange} />

            {file && (
                <p className="file-info">
                    Seleccionado: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
                </p>
            )}

            {previewUrl && <img src={previewUrl} alt="preview" className="preview" />}

            <button type="submit" className="btn">Subir</button>

            {status && <p className="status">{status}</p>}
            </form>
            </div>
    );
}
