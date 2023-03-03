/*=============== nav바 보이기 ===============*/
const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')

// nav메뉴 보이기 - 클릭하면 nav메뉴 보이기
if (navToggle) {
        navToggle.addEventListener('click', () => {
                navMenu.classList.add('show-menu')
        })
}

// nav메뉴 숨기기 - 클릭하면 nav메뉴 숨기기
if (navClose) {
        navClose.addEventListener('click', () => {
                navMenu.classList.remove('show-menu')
        })
}


/*=============== nav메뉴 모바일 없애기 ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
        // 각 nav__link 클릭할때, show-menu 클래스 없애주기
        navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* 프로젝트 필터 보고있는 카테고리 활성화 */
const linkProject = document.querySelectorAll('.project__item')

function activeProject() {
        linkProject.forEach(l => l.classList.remove('active-project'))
        this.classList.add('active-project')
}
linkProject.forEach(l => l.addEventListener('click', activeProject))


/*=============== 프로젝트 필터 mixitup 라이브러리 ===============*/
let mixerProjects = mixitup('.projects__container', {
        selectors: {
                target: '.projects__content'
        },
        animation: {
                duration: 300
        }
});


/*=============== SWIPER 라이브러리 - TESTIMONIAL ===============*/
let swiperTestmonial = new Swiper(".testimonial__container", {
        grabCursor: true,
        navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
        },
});

/*=============== EMAIL JS ===============*/
/* https://www.emailjs.com/ */
const contactForm = document.getElementById('contact-form'),
        contactName = document.getElementById('contact-name'),
        contactEmail = document.getElementById('contact-email'),
        contactProject = document.getElementById('contact-project'),
        contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
        e.preventDefault()

        // 유효성 체크
        if(contactName.value === '' || contactEmail.value === '' || contactProject.value === ''){
                // Add and remove color
                contactMessage.classList.remove('color-blue')
                contactMessage.classList.add('color-red')

                // Show message
                contactMessage.textContent = '빈칸을 채워주세요~! 📩'
        } else {
                // serviceID - templateID - #form - publicKey
                emailjs.sendForm('service_t8upwsc','template_3bsnhsx','#contact-form','eKdbWsC43a3jjnU7K')
                .then(()=>{
                        // Show message and add color
                        contactMessage.classList.add('color-blue')
                        contactMessage.textContent = '전송되었습니다. 감사합니다! ✅'

                        // Remove message after five seconds
                        setTimeout(() => {
                                contactMessage.textContent = ''
                        }, 5000)
                }, (error) =>{
                        alert('뭔가 잘못되었네요!...', error)
                })

                // 이메일 전송후 전체 비우기
                contactName.value = ''
                contactEmail.value = ''
                contactProject.value = ''
        }
}
contactForm.addEventListener('submit', sendEmail)

/*=============== 섹션 스크롤에 따른 ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id')
const scrollActive = () => {
        const scrollY = window.pageYOffset

        sections.forEach(current => {
                const sectionHeight = current.offsetHeight,
                    sectionTop = current.offsetTop - 58,
                        sectionId = current.getAttribute('id'),
                        sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                        sectionsClass.classList.add('active-link')
                }else{
                        sectionsClass.classList.remove('active-link')
                }
        })
}
window.addEventListener('scroll', scrollActive)

/*=============== 스크롤업 버튼 보이기  ===============*/
const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up')
        // 350 viewport 기준으로 나타난다
        this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                                  : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== 다크 모드 테마 ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line' // 리믹스콘에서 가져온 클래스

// 사용자가 전에 선택한 테마
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// dark-theme 클래스의 유효성을 검사하여 인터페이스에 있는 현재 테마 얻기
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// 사용자가 이전에 모드를 선택했는지 확인
if(selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// 버튼 클릭으로 모드 변경
themeButton.addEventListener('click', () => {
        // 다크테마,아이콘을 추가하거나 뺴거나
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // 사용자가 선택한 테마와 현재 아이콘을 저장
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
})


/*=============== 헤더 배경 변화 ===============*/
const scrollHeader = () =>{
        const header = document.getElementById('header')
        // 스크롤이 50 뷰포트 높이보다 크면 header 태그에 scroll-header 클래스를 추가
        this.scrollY >= 50 ? header.classList.add('bg-header')
                                : header.classList.remove('bg-header') 
}
window.addEventListener('scroll', scrollHeader)


/*=============== SCROLL REVEAL ANIMATION 라이브러리 ===============*/
const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 400,
        // reset: true 설정시 애니메이션 반복
})
sr.reveal(`.home__data, .projects__container, .testimonial__container, .footer__container, .greeting__container`)
sr.reveal(`.home__info div`, {delay: 500, origin: 'bottom', interval: 100})
sr.reveal('.skills__content:nth-child(1), .contact__content:nth-child(1)', {origin: 'left'})
sr.reveal('.skills__content:nth-child(2), .contact__content:nth-child(2)', {origin: 'right'})
sr.reveal('.qualification__content, .services__card', {interval: 60})

/*=============== SWIPER 라이브러리 - GREETING ===============*/
let swiperGreeting = new Swiper(".greeting__container", {
  spaceBetween: 30,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});