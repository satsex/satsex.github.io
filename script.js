document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');

    // Función para obtener y mostrar los comentarios
    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:3000/comments');
            const comments = await response.json();
            commentList.innerHTML = ''; // Limpiar la lista antes de volver a mostrar
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                    <h4>${comment.nombre}</h4>
                    <p>${comment.comentario}</p>
                    <small>${new Date(comment.fecha).toLocaleString()}</small>
                `;
                commentList.appendChild(commentDiv);
            });
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };

    // Manejar el envío del formulario
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = document.getElementById('nombre').value;
        const comentario = document.getElementById('comentario').value;

        try {
            const response = await fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, comentario })
            });

            if (response.ok) {
                // Si el envío fue exitoso, recarga la lista de comentarios
                commentForm.reset(); // Limpia el formulario
                fetchComments();
            } else {
                console.error('Error al guardar el comentario');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    });

    // Cargar los comentarios al inicio
    fetchComments();
});