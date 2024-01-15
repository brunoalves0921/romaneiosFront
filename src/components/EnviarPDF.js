import api from '@/utils/api'
import React, { useState } from 'react'
import styles from '@/styles/EnviarPDF.module.css'

export default function EnviarPDF() {
  const [selectedFile, setSelectedFile] = useState(null)

  function changeFile(file) {
    if (file == null || (file.name.endsWith('.pdf') && file.type === 'application/pdf')) {
      setSelectedFile(file)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    changeFile(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    console.log(file)
    changeFile(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const sendFile = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)
    const response = await api.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    })

    // Criar um URL temporário para o arquivo .zip
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Criar um link e simular um clique para iniciar o download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
    document.body.appendChild(link);
    link.click();

    // Limpar o link e o URL temporário após o download
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Transformar romaneios.pdf em rotas separadas por planilhas</h2>

      <label
        htmlFor="file-input"
        className={styles.dropArea + ' ' + styles.fileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedFile
          ? 'ARQUIVO SELECIONADO: ' + selectedFile.name
          : 'Arraste e solte um arquivo PDF ou clique para selecionar.'
        }
        <input
            type="file"
            id="file-input"
            accept="application/pdf"
            onChange={handleFileChange}
          />
      </label>

      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonSend}
          disabled={!selectedFile}
          onClick={sendFile}
        >
          PROCESSAR
        </button>
      </div>
    </div>
  )
}
