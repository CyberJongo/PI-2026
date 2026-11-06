 const track = document.getElementById('carouselTrack');
    const slides = track.children;
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let index = 0;
    let autoplay;

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.children;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('active', i === index);
    }
    function goTo(i) { index = (i + slides.length) % slides.length; update(); resetAutoplay(); }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    function resetAutoplay() { clearInterval(autoplay); autoplay = setInterval(next, 6000); }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    update();
    resetAutoplay();