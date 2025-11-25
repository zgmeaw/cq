document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const drawAgainButton = document.getElementById('drawAgainButton');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');
    const initialMessage = document.getElementById('initialMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    const signImage = document.getElementById('signImage');
    const signTitle = document.getElementById('signTitle');
    const signPoem = document.getElementById('signPoem');
    const signContent = document.getElementById('signContent');
    
    // 求签函数
    function drawSign() {
        // 显示加载中
        loading.style.display = 'block';
        resultContainer.style.display = 'none';
        initialMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // 调用API
        fetch('https://v2.xxapi.cn/api/wenchangdijunrandom')
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应错误');
                }
                return response.json();
            })
            .then(data => {
                // 隐藏加载中
                loading.style.display = 'none';
                
                if (data.code === 200) {
                    // 更新页面内容
                    signImage.src = data.data.pic;
                    signImage.alt = data.data.title;
                    signTitle.textContent = data.data.title;
                    signPoem.textContent = data.data.poem;
                    signContent.textContent = data.data.content;
                    
                    // 显示结果
                    resultContainer.style.display = 'block';
                    drawAgainButton.style.display = 'inline-block';
                    drawButton.style.display = 'none';
                } else {
                    throw new Error('API返回错误');
                }
            })
            .catch(error => {
                console.error('求签错误:', error);
                loading.style.display = 'none';
                errorMessage.style.display = 'block';
            });
    }
    
    // 绑定按钮事件
    drawButton.addEventListener('click', drawSign);
    drawAgainButton.addEventListener('click', drawSign);
});