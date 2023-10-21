document.addEventListener("DOMContentLoaded", function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const MAX_IMAGES = 5;

    // Write the code for all the dropzone functionality here
    dropzone.addEventListener('dragover', handleDragOver, false);
    dropzone.addEventListener('dragleave', handleDragLeave, false);
    dropzone.addEventListener('drop', handleDrop, false);

    function handleDragOver(e) {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            // check if the file is an image
            if (!files[i].type.startsWith('image/')) {
                alert("File " + files[i].name + " is not an image.");
                continue;
            }

            if (files[i].size > 1048576) {
                alert("File " + files[i].name + " is larger than 1MB.");
                continue;
            }
            let totalFiles = fileList.children.length;
            totalFiles++;
            if (totalFiles > MAX_IMAGES) {
                alert("Maximum images allowed is " + MAX_IMAGES + ". " + files[i].name + " won't be added.");
                break;
            }

            displayFile(files[i]);
        }

        while (fileList.children.length > MAX_IMAGES) {
            fileList.removeChild(fileList.firstChild);
        }

        saveToLocalStorage();
    }

     // Function to save data to localStorage
     function saveToLocalStorage() {
        const imagesData = [];
        const fileItems = fileList.children;
        for (let i = 0; i < fileItems.length; i++) {
            const fileItem = fileItems[i];
            const imageSrc = fileItem.querySelector('.thumbnail').src;
            const imageDescription = fileItem.querySelector('textarea').value;
            imagesData.push({ src: imageSrc, description: imageDescription });
        }
        localStorage.setItem('storedImagesData', JSON.stringify(imagesData));
    }

    function displayFile(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'file-name';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            img.className = 'thumbnail';
            div.appendChild(img);

            // Add textarea for description
            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Enter description...';
            div.appendChild(textarea);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteImage(file.name);
                fileList.removeChild(div);
            });

            const icon = document.createElement('i');
            icon.className = 'fa fa-trash'; // Replace with your desired icon class
            deleteBtn.appendChild(icon);

            div.appendChild(deleteBtn);

            fileList.appendChild(div);
        };
        reader.readAsDataURL(file);
    }

    function deleteImage(fileName) {
        const imagesData = JSON.parse(localStorage.getItem('storedImagesData') || '[]');
        const updatedImages = imagesData.filter(data => data.src !== fileName);
        localStorage.setItem('storedImagesData', JSON.stringify(updatedImages));
    }




    // Function to load data from localStorage
    function loadFromLocalStorage() {
        const storedImagesData = JSON.parse(localStorage.getItem('storedImagesData') || '[]');
        console.log("Loaded from localStorage:", storedImagesData);
        storedImagesData.forEach(data => {
            const div = document.createElement('div');
            div.className = 'file-name';
    
            const img = document.createElement('img');
            img.src = data.src; // Use data.src instead of e.target.result
            img.alt = data.name; // Use data.name instead of file.name
            img.className = 'thumbnail';
            div.appendChild(img);
    
            // Add textarea for description
            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Enter description...';
            div.appendChild(textarea);
    
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteImage(data.src); // Use data.src instead of data.name
                fileList.removeChild(div);
                 saveToLocalStorage();
            });
    
            const icon = document.createElement('i');
            icon.className = 'fa fa-trash'; // Replace with your desired icon class
            deleteBtn.appendChild(icon);
    
            div.appendChild(deleteBtn);
    
            fileList.appendChild(div);
        });
    }
    

    loadFromLocalStorage();
});
