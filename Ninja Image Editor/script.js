const imageEditor = {
    fileInput: document.querySelector(".file-input"),
    filterButtons: document.querySelectorAll(".filter button"),
    filterNameElement: document.querySelector(".filter-info .name"),
    filterValueElement: document.querySelector(".filter-info .value"),
    filterSliderElement: document.querySelector(".slider input"),
    rotateButtons: document.querySelectorAll(".rotate button"),
    previewImageElement: document.querySelector(".preview-img img"),
    resetFilterButton: document.querySelector(".reset-filter"),
    chooseImageButton: document.querySelector(".choose-img"),
    saveImageButton: document.querySelector(".save-img"),
  
    filterValues: {
      brightness: 100,
      saturation: 100,
      inversion: 0,
      grayscale: 0,
    },
    rotateValue: 0,
    flipHorizontal: 1,
    flipVertical: 1,
  
    applyFilters() {
      const { brightness, saturation, inversion, grayscale } = this.filterValues;
      this.previewImageElement.style.transform = `rotate(${this.rotateValue}deg) scale(${this.flipHorizontal}, ${this.flipVertical})`;
      this.previewImageElement.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    },
  
    handleFilterClick(button) {
      document.querySelector(".active").classList.remove("active");
      button.classList.add("active");
      this.filterNameElement.innerText = button.innerText;
      this.filterSliderElement.max = button.id === "brightness" || button.id === "saturation" ? 200 : 100;
      this.filterSliderElement.value = this.filterValues[button.id];
      this.filterValueElement.innerText = `${this.filterValues[button.id]}%`;
    },
  
    handleRotateClick(button) {
      const actions = {
        left: () => (this.rotateValue -= 90),
        right: () => (this.rotateValue += 90),
        horizontal: () => (this.flipHorizontal = -this.flipHorizontal),
        vertical: () => (this.flipVertical = -this.flipVertical),
      };
      actions[button.id]();
      this.applyFilters();
    },
  
    resetFilters() {
      this.filterValues = {
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
      };
      this.rotateValue = 0;
      this.flipHorizontal = 1;
      this.flipVertical = 1;
      this.filterButtons[0].click();
      this.applyFilters();
    },
  
    saveEditedImage() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = this.previewImageElement.naturalWidth;
      canvas.height = this.previewImageElement.naturalHeight;
  
      const { brightness, saturation, inversion, grayscale } = this.filterValues;
      context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      context.translate(canvas.width / 2, canvas.height / 2);
  
      if (this.rotateValue !== 0) {
        context.rotate((this.rotateValue * Math.PI) / 180);
      }
  
      context.scale(this.flipHorizontal, this.flipVertical);
      context.drawImage(
        this.previewImageElement,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
  
      const link = document.createElement("a");
      link.download = "edited_image.jpg";
      link.href = canvas.toDataURL();
      link.click();
    },
  
    loadChosenImage() {
      const chosenFile = this.fileInput.files[0];
      if (!chosenFile) return;
      this.previewImageElement.src = URL.createObjectURL(chosenFile);
      this.previewImageElement.addEventListener("load", () => {
        this.resetFilterButton.click();
        document.querySelector(".container").classList.remove("disable");
      });
    },
  
    initialize() {
      this.filterButtons.forEach((button) => {
        button.addEventListener("click", () => this.handleFilterClick(button));
      });
  
      this.rotateButtons.forEach((button) => {
        button.addEventListener("click", () => this.handleRotateClick(button));
      });
  
      this.filterSliderElement.addEventListener("input", () => {
        this.filterValueElement.innerText = `${this.filterSliderElement.value}%`;
        const selectedFilterButton = document.querySelector(".filter .active");
        this.filterValues[selectedFilterButton.id] = this.filterSliderElement.value;
        this.applyFilters();
      });
  
      this.resetFilterButton.addEventListener("click", () => this.resetFilters());
      this.saveImageButton.addEventListener("click", () => this.saveEditedImage());
      this.fileInput.addEventListener("change", () => this.loadChosenImage());
      this.chooseImageButton.addEventListener("click", () => this.fileInput.click());
    },
  };
  
  imageEditor.initialize();
  