const arrAnimation = document.querySelectorAll('.animated');

function visibility() {
    arrAnimation.forEach(element => {
        const y = element.getBoundingClientRect().y;
        const height = element.getBoundingClientRect().height;
        console.log(document.querySelector('.two-columns__brief').getBoundingClientRect().y);
        if (y > (-height) && y < (document.documentElement.clientHeight + height - (height/10))) {
            element.classList.add('go');
        } else {
            element.classList.remove('go');
            element.style.opacity = '0';
        }
    });
}

document.addEventListener("scroll", visibility);