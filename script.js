const messageContainer = document.getElementById('messageContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const avatarInput = document.getElementById('avatarInput');
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeButton = document.querySelector('.close');
const saveSettingsButton = document.getElementById('saveSettingsButton');
const usernameInput = document.getElementById('usernameInput');

let selectedAvatar = null;
let showSpecialIcon = false; // 默认不显示图标
let usernameValue = localStorage.getItem('username') || '';

avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedAvatar = file;
    } else {
        selectedAvatar = null;
    }
});

sendButton.addEventListener('click', () => {
    const messageText = userInput.value;
    if (messageText.trim() !== '') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const userAvatarDiv = document.createElement('div');
        userAvatarDiv.classList.add('user-avatar');
        const avatarImg = document.createElement('img');
        avatarImg.src = selectedAvatar ? URL.createObjectURL(selectedAvatar) : '';
        avatarImg.alt = 'User Avatar';
        userAvatarDiv.appendChild(avatarImg);
        messageDiv.appendChild(userAvatarDiv);

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        const userNameDiv = document.createElement('div');
        userNameDiv.classList.add('user-name');
        userNameDiv.textContent = usernameValue;
        // 检查 showSpecialIcon 全局变量，如果 true 则添加特殊角色图标
        if (showSpecialIcon) {
            const specialRoleIcon = document.createElement('img');
            specialRoleIcon.src = 'lowiro.png'; // 这里用来替换本身有的图标
            specialRoleIcon.classList.add('special-role-icon');
            userNameDiv.appendChild(specialRoleIcon);
        }

        const messageTimeSpan = document.createElement('span');
        messageTimeSpan.classList.add('message-time');
        const now = new Date();
        const formattedTime = now.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        messageTimeSpan.textContent = formattedTime;
        userNameDiv.appendChild(messageTimeSpan); // 层级嵌套
        messageContentDiv.appendChild(userNameDiv); // 层级嵌套
        const messageTextDiv = document.createElement('div');
        messageTextDiv.classList.add('message-text');
        messageTextDiv.textContent = messageText;
        messageContentDiv.appendChild(messageTextDiv);
        messageDiv.appendChild(messageContentDiv);
        messageContainer.appendChild(messageDiv);
        userInput.value = '';

        selectedAvatar = null; // 重置 selectedAvatar，使下一条消息可以选择新的头像
    }
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

const showIconCheckbox = document.getElementById('showIconCheckbox');
// 根据 showSpecialIcon 更新复选框
showIconCheckbox.checked = showSpecialIcon;
// 使用加载值更新用户名字段
usernameInput.value = usernameValue;

usernameInput.addEventListener('input', () => {
    usernameValue = usernameInput.value;
});

saveSettingsButton.addEventListener('click', () => {
    showSpecialIcon = showIconCheckbox.checked;
    localStorage.setItem('username', usernameValue); // 将更新后的用户名保存
    settingsModal.style.display = 'none';
});
