function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelector(selector);
}

//监听右上角图标，点击出现登录框
$('header .login').onclick = function(e) {
    e.stopPropagation();  //这里也要阻止冒泡到window 如果不阻止，点击右上角图标登入框就会关闭<1>
    $('.flip-modal').style.display = 'block';
}

$('.flip-modal').addEventListener('click', function (e) {
    e.stopPropagation(); //点到flip-modal就阻止冒泡 如果不阻止，点击（登入、注册框）的空白处就会关闭<1>
    if (e.target.classList.contains('login')) {
        $('.flip-modal').classList.add('login');
        $('.flip-modal').classList.remove('register');
    }
    if (e.target.classList.contains('register')) {
        $('.flip-modal').classList.add('register');
        $('.flip-modal').classList.remove('login');
    }

    //点击‘×’号，登入、注册框关闭
    window.target = e.target;
    if (e.target.classList.contains('close')) {
        $('.flip-modal').style.display = 'none';
    }
})

//点击空白处，登入、注册框关闭<1>
document.addEventListener('click', function () {
    $('.flip-modal').style.display = 'none';
})

$('.modal-login form').addEventListener('submit', function (e) {
    e.preventDefault(); //先别跳，做一个正则的匹配
    // 如果用户名输入的value不满足条件，.erromsg就会输出文本innerText。如果满足直接跳过接下一步→最后手动调用form(this)表单submit()
    if (!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)) {
        $('.modal-login .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线';
        return false;
    }
    if (!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)) {
        $('.modal-login .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线';
        return false;
    }
    this.submit();
})

$('.modal-register form').addEventListener('submit', function (e) {
    e.preventDefault()
    if (!/^\w{3,8}$/.test($('.modal-register input[name=username]').value)) {
        $('.modal-register .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线';
        return false;
    }
    if (/^user$|^username$/.test($('.modal-register input[name=username]').value)) { //这里需要发AJAX请求去获取去查询来判断用户名是否已存在
        $('.modal-register .errormsg').innerText = '用户名已存在';
        return false;
    }
    if (!/^\w{6,10}$/.test($('.modal-register input[name=password]').value)) {
        $('.modal-register .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线';
        return false;
    }
    if ($('.modal-register input[name=password]').value !== $('.modal-register input[name=password2]').value) {
        $('.modal-register .errormsg').innerText = '两次输入的密码不一致';
        return false;
    }
    this.submit();
})
