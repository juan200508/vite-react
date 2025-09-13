import { useEffect, useState } from "react";

const API_URL = "http://98.71.169.48:8000/files/"; // Ajusta la URL si tu backend está en otro puerto

const FileList = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
            throw new Error("Error al obtener los archivos");
            }
            const data = await response.json();
            setFiles(data.archivos);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
        };

        fetchFiles();
    }, []);

    if (loading) return <p>Cargando archivos...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div style={{ padding: "20px" }}>
        <h2>📂 Archivos Subidos</h2>
        {files.length === 0 ? (
            <p>No hay archivos disponibles.</p>
        ) : (
            <ul>
            {files.map((file, index) => (
                <li key={index}>{file}</li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default FileList;
