// DOM element references
const circularButtonDiv = document.getElementById("circular-container");
const uploadButton = document.getElementById("upload");
const umbrellaImage = document.getElementById("umbrella-image");
const fileUploader = document.getElementById("fileUploader");
const logoField = document.getElementById("logo");
const loadingIcon = document.getElementById("loading");
const crossIcon = document.getElementById("cross-icon");
const notificationCrossIcon = document.getElementById(
  "notification-cross-icon"
);
const logoNameSpan = document.getElementById("logo-name");
const notificationPopup = document.getElementById("notification-popup");

// Data for different theme configurations
const data = [
  {
    lightColor: "#9f9992",
    border: "#53504c",
    darkColor: "#000",
    umbrellaAssetLocation: "", //black umbrella path
  },
  {
    lightColor: "#d6d9d7",
    border: "#8b8d8c",
    darkColor: "#707372",
    umbrellaAssetLocation: "", //Gray umbrella path
  },
  {
    lightColor: "#5191c5",
    border: "#325979",
    darkColor: "#003057",
    umbrellaAssetLocation: "",
  },
  {
    lightColor: "#f8bbd0",
    border: "#d9308a",
    darkColor: "#d0006f",
    umbrellaAssetLocation: "assets/Pink-umbrella.png",
  },
  {
    lightColor: "#fff9c4",
    border: "#feda67",
    darkColor: "#fdd835",
    umbrellaAssetLocation: "assets/Yello-umbrella.png",
  },
  {
    lightColor: "#e6f6fc",
    border: "#b8e5f6",
    darkColor: "#0390f4",
    umbrellaAssetLocation: "assets/Blue-umbrella.png",
  },
  {
    lightColor: "#f8bbd0",
    border: "#ed924e",
    darkColor: "#e87722",
    umbrellaAssetLocation: "",
  },
  {
    lightColor: "#f25c66",
    border: "#f25c66",
    darkColor: "#ef3340",
    umbrellaAssetLocation: "",
  },
];

// Function to create and attach circular color buttons based on data
function createAndAttachButton(metadata) {
  const button = document.createElement("BUTTON");
  button.classList.add("circular-button");
  button.style.border = `5px solid ${metadata.border}`;
  button.onclick = () => {
    changeTheme(
      metadata.umbrellaAssetLocation,
      metadata.lightColor,
      metadata.darkColor
    );
  };
  button.style.backgroundColor = metadata.darkColor;
  circularButtonDiv.appendChild(button);
}

// Create circular buttons for each theme configuration
data.forEach((metadata) => {
  createAndAttachButton(metadata);
});

// Function to change theme based on selected button
function changeTheme(imageURL, backgroundColor, darkColor) {
  if (imageURL !== "") {
    removeLoadingIcon();
    umbrellaImage.src = imageURL;
  } else {
    displayLoadingIcon();
  }
  document.body.style.backgroundColor = backgroundColor;
  uploadButton.style.backgroundColor = darkColor;
}

// Function to display the notification popup
function showNotificationPopup() {
  notificationPopup.style.display = "flex";
}

// Function to hide the notification popup
function hideNotificationPopup() {
  notificationPopup.style.display = "none";
}

// Click handler for upload button
uploadButton.onclick = () => {
  if (umbrellaImage.classList.contains("disabled")) {
    showNotificationPopup();
    setTimeout(() => hideNotificationPopup(), 5000); // Hide notification after 5 seconds
  } else {
    fileUploader.click(); // Trigger file uploader
  }
};

// Function to display loading icon
function displayLoadingIcon() {
  logoField.classList.add("disabled");
  umbrellaImage.classList.add("disabled");
  loadingIcon.classList.remove("disabled");
}

// Function to remove loading icon
function removeLoadingIcon() {
  logoField.classList.remove("disabled");
  umbrellaImage.classList.remove("disabled");
  loadingIcon.classList.add("disabled");
}

// File upload change event handler
fileUploader.onchange = function (e) {
  e.stopPropagation();
  if (this.files && this.files[0]) {
    const file = this.files[0];
    const fileName = file.name;
    const fileSize = file.size; // in bytes
    const fileType = file.type;

    // Validate file before proceeding
    if (checkValidation(fileSize, fileType)) {
      const reader = new FileReader();
      reader.onload = loadImage;
      reader.readAsDataURL(file);
      crossIcon.classList.remove("disabled");
      logoNameSpan.textContent = fileName;
      displayLoadingIcon(); // Display loading icon while image is loading
    }
  }
};

// Function to load selected image
function loadImage(e) {
  removeLoadingIcon();
  logoField.src = e.target.result;
}

// Function to validate file type and size
function checkValidation(fileSize, fileType) {
  // Validate file type (only PNG or JPEG allowed)
  if (!(fileType === "image/png" || fileType === "image/jpeg")) {
    alert("Please select a valid image file (PNG or JPEG).");
    return false;
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (fileSize > maxSize) {
    alert("File size exceeds the limit of 5MB.");
    return false;
  }

  return true;
}

// Click handler for cross icon to clear selected logo
crossIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  logoField.src = "";
  fileUploader.value = null;
  logoNameSpan.textContent = "UPLOAD LOGO";
  crossIcon.classList.add("disabled");
});

// Click handler for notification popup close icon
notificationCrossIcon.addEventListener("click", function (event) {
  hideNotificationPopup();
});

// Function to remove old color classes from loading icon (not fully implemented)
function removeOldColorClasses() {
  // To be implemented based on specific requirements
  // data.forEach((metadata) => {
  //   loadingIcon.classList.remove(metadata.colorClass);
  // });
}
