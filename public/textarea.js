let textarea = document.querySelector('.section_main > textarea'),
    txtCount = document.querySelector('.txt_count');

txtCount.innerHTML = textarea.value.length;

textarea.addEventListener('keydown', (e) => {
    let length = e.target.value.length;
    txtCount.innerHTML = length;
});

let colors = document.querySelectorAll(".color_select > input[name='color']"),
    section = document.querySelector('section');

colors.forEach((color) => {
    if (section.classList[0] === color.value) {
        color.checked = true;
    }
    color.addEventListener('change', (e) => {
        if (e.target.checked) {
            section.className = e.target.value;
        }
    });
});
