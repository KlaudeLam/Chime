import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";
import {  } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { storage, firestore } from "./firebase-config.js";
// import { } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

// PREVIEW THUMBNAIL-------------------------------
const thumbnailInput = document.getElementById('input-thumbnail');
const filenameLabel = document.getElementById('filename');
const imagePreview = document.getElementById('image-preview');
const thumbnailPreview = document.getElementById('thumbnail-preview');
const thumbnailInputZone = document.getElementById('thumbnail-input-zone');

// Check if the event listener has been added before
let isEventListenerAdded = false;

thumbnailInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        filenameLabel.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            thumbnailPreview.innerHTML =
            `<img src="${e.target.result}" class="object-cover" alt="Image preview"/>`;
            imagePreview.classList.remove('border-dashed', 'border-2', 'border-gray-400');
            thumbnailInputZone.style.display = "none";


            // Add event listener for image preview only once
            if (!isEventListenerAdded) {
            imagePreview.addEventListener('click', () => {
                thumbnailInput.click();
            });

            isEventListenerAdded = true;
            }
        };
        reader.readAsDataURL(file);
    } else {
    filenameLabel.textContent = '';
    thumbnailPreview.innerHTML =
        `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    imagePreview.classList.add('border-dashed', 'border-2', 'border-gray-400');
    thumbnailInputZone.style.display = "none";

    // Remove the event listener when there's no image
    imagePreview.removeEventListener('click', () => {
        thumbnailInput.click();
    });

    isEventListenerAdded = false;
    }
});

thumbnailInput.addEventListener('click', (event) => {
    event.stopPropagation();
});

// UPDATE STORAGE-------------------------------
const btnConfirmPublish = document.getElementById("btn-confirm-publish");

// const storageRef = ref(storage, `${title}`);
// await uploadBytes(storageRef, )

// Đặt tên cho thư mục con (child folder) trong dịch vụ lưu trữ
const audioFolder = 'audio';
const thumbnailFolder = 'thumbnail';

const storageRefAudio = ref(storage, audioFolder);
const storageRefThumbnail = ref(storage, thumbnailFolder);

document.addEventListener('DOMContentLoaded', function() {

    // Lắng nghe sự kiện click cho nút upload
    btnConfirmPublish.addEventListener('click', function() {
        // Chọn file mp3 từ người dùng
        const trackFile = document.getElementById('input-track').files[0];
        
        // Check if track is uploaded
        if (trackFile) {
            // Tạo một nhiệm vụ tải lên có khả năng tạm dừng
            const uploadTask = uploadBytesResumable(ref(storageRefAudio, trackFile.name), trackFile);

            // Theo dõi sự kiện tải lên
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Thực hiện theo dõi tiến trình tải lên (nếu cần)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Track uploading: ' + progress + '% done');
                },
                (error) => {
                    // Xử lý lỗi
                    console.error('Error uploading file:', error);
                },
                
                () => {
                    // Hoàn thành tải lên, lấy URL tải xuống
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File uploaded successfully! Download URL:', downloadURL);
                    });
                }
            );
        } else {
            console.error('No file selected.');
        }

        // Chọn file img từ người dùng
        const thumbnailFile = document.getElementById('input-thumbnail').files[0];

        // Check if thumbnail is uploaded
        if (thumbnailFile) {
            // Tạo một nhiệm vụ tải lên có khả năng tạm dừng
            const uploadTask = uploadBytesResumable(ref(storageRefThumbnail, thumbnailFile.name), thumbnailFile);

            // Theo dõi sự kiện tải lên
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Thực hiện theo dõi tiến trình tải lên (nếu cần)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Thumbnail uploading: ' + progress + '% done');
                },
                (error) => {
                    // Xử lý lỗi
                    console.error('Error uploading file:', error);
                },
                
                () => {
                    // Hoàn thành tải lên, lấy URL tải xuống
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File uploaded successfully! Download URL:', downloadURL);
                    });
                }
            );
        } else {
            console.error('No file selected.');
        }
    })
    }
);

// UPLOAD TO FIRESTORE DATABASE--------------------
const title = document.getElementById("input-title").value,
description = document.getElementById("input-description").value;

const data = {
    date: Date.now(),
    title,
    description,
    // thumbnail: URL,
    // track: URL,
    // uid: auth.currentUser.uid,
    // artist: auth.currentUser.displayName,
    // research how to store thumbnail and tracck url
}