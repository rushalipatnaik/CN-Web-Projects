document.addEventListener("DOMContentLoaded", function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const MAX_IMAGES = 5;

    //Write the code of all the dropzone functionality here
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
        if (files.length) {
            handleFiles(files);
        }
    }

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            if (images.length < MAX_IMAGES && images.every(img => img.name !== files[i].name)) {
                const file = files[i];
                if (file.type.match('image.*') && file.size <= 1048576) {
                    images.push(file);
                    displayFile(file);
                } else {
                    alert('Invalid file. Please upload images under 1MB.');
                }
            } else {
                alert('You can upload a maximum of 5 images.');
            }
        }
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
    
            //Complete the function here
            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Enter description...';
            div.appendChild(textarea);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteImage(file.name);
                fileList.removeChild(div);
            });
            div.appendChild(deleteBtn);

            fileList.appendChild(div);
        };
        reader.readAsDataURL(file);
    }

    function deleteImage(fileName) {
        images = images.filter(img => img.name !== fileName);
        saveToLocalStorage();
    }

    // Function to save data to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('storedImagesData', JSON.stringify(images));
    }


    //Function to load the data from localStorage
    function loadFromLocalStorage() {
        const storedImagesData = JSON.parse(localStorage.getItem('storedImagesData') || '[]');
        console.log("Loaded from localStorage:", storedImagesData);
        storedImagesData.forEach(data => {
            const div = document.createElement('div');
            div.className = 'file-name';
    
            const img = document.createElement('img');
            img.src = data.src;
            img.className = 'thumbnail';
            div.appendChild(img);
            
            // Write rest of the code here
            const textarea = document.createElement('textarea');
            textarea.value = data.description;
            div.appendChild(textarea);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteImage(data.name);
                fileList.removeChild(div);
            });
            div.appendChild(deleteBtn);

            fileList.appendChild(div);
            
        });
    }
    loadFromLocalStorage();


    // JavaScript for automatic carousel slide
let slideIndex = 0;
carousel();

function carousel() {
  let i;
  const x = document.getElementsByClassName("carousel-item");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}    
  x[slideIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

    
});

