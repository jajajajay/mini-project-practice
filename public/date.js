let date = new Date(),
    outstr = document.querySelector('.create_date');

outstr.innerHTML = date.toISOString().slice(0, 10);
