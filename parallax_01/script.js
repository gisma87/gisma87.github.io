window.addEventListener('scroll', function () {

    const s = pageYOffset;
    const w = document.documentElement.clientWidth;
    const h = document.querySelector('.content').clientHeight;
    const h_b = document.querySelector('.parallax').clientHeight;
    const p = s / h * 100;
    const p_b = s / h_b * 100;
    const o = 1 - p_b / 100;

    const z_1 = 1 + (w / 10000 * p_b);
    const fog = document.querySelector('.parallax__fog');
    fog.style.transform = `scale(${z_1})`;
    fog.style.opacity = `${o}`;

    const z_2 = 1 + (w / 5000000 * p);
    document.querySelector('.parallax__mountain_1').style.transform = `scale(${z_2})`;

    const hr = w / 2000 * p_b;
    const z_3 = 1 + (w * 0.000005 * p_b);
    document.querySelector('.parallax__mountain_2').style.transform = `translate3d(${hr}px,0,0) scale(${z_3})`;

    const hr_2 = w / 1500 * p_b;
    const z_4 = 1 + (w * 0.00001 * p_b);
    document.querySelector('.parallax__mountain_3').style.transform = `translate3d(${hr_2}px,0,0) scale(${z_4})`;

});