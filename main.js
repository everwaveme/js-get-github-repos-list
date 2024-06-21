const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const outputList = document.querySelector('.output-list');

btn.addEventListener('click', () => {
    outputList.innerHTML = '';

    let inputValue = input.value.trim();

    if (inputValue) {
        btn.disabled = true;

        fetch(`https://api.github.com/users/${inputValue}/repos`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('User is not found...');
                }
                return res.json();
            })
            .then(data => {
                data.forEach(item => {
                    
                    outputList.innerHTML += `
                        <li class="output-item">
                            <p class="output-text">${item.name}</p>
                            <a href="${item.html_url}" class="output-link" target="_blank">
                                <img src="./static/arrow.png" alt="Link to repos">
                            </a>
                        </li>
                    `;
                })
            })
            .catch(error => {
                outputList.innerHTML = `
                    <p class="output-text">${error.message}</p>
                `;
            })
            .finally(() => {
                btn.disabled = false;
            })
    } else {
        outputList.innerHTML = `
            <p class="output-text">
                Error! Enter username!
            </p>
        `;
    }
})
