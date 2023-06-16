const DEFAULT_CSS_ANIMATION_DELAY = 700;
const DEFAULT_BANNER_DELAY = 5000;
const DEFAULT_ANIMATION_DELAY_START = 100;

const SUCCESSFULLY_MESSAGE = 'message-id-successfully';
const SUCCESSFULLY_RESEND = 'message-id-resend';

function Subscriber(){
    this.homeContainer = $('.home-container');
    this.subscribeHeader = $('.subscribe-header');
    this.subscribeFooter = $('.subscribe-footer');
    this.subscribeStep1 = $('.subscriber-main-step-1');
    this.subscribeStep2 = $('.subscriber-main-step-2');

    this.nextButtonStep1 = this.subscribeStep1.find('.go-step-2');
    this.nextButtonStep2 = this.subscribeStep2.find('.go-finish');

    this.subscribeButton = $('.subscribe-me');
    this.subscribeMessage = $('.subscription-status');
    this.subscribeShowFormLink = $('.show-subscribe-form');

    this.readMoreStep1 = this.subscribeStep1.find('.read-more-link');
    this.readMoreStep2 = this.subscribeStep2.find('.read-more-link');

    this.disclaimerStep1 = this.subscribeStep1.find('.disclaimer');
    this.disclaimerStep2 = this.subscribeStep2.find('.disclaimer');

    this.phone = this.subscribeStep1.find('#phone');
    this.phoneStatus = this.subscribeStep1.find('.phone-status');
    this.phoneIsValid = false;

    this.otpActions = this.subscribeStep2.find('.subscribe-actions');
    this.step1ReturnLink = this.subscribeStep2.find('.return-step-1');
    this.resendCode = this.subscribeStep2.find('.resend-code');


    this.otpCode = [
        this.subscribeStep2.find('.pin-container input:eq(0)'),
        this.subscribeStep2.find('.pin-container input:eq(1)'),
        this.subscribeStep2.find('.pin-container input:eq(2)'),
        this.subscribeStep2.find('.pin-container input:eq(3)'),
    ]

    this.init = () => {
        this.homeContainer.show();
        this.subscribeHeader.hide();
        this.subscribeFooter.hide();
        this.subscribeStep1.hide();
        this.subscribeStep2.hide();
        this.subscribeShowFormLink.hide();
        this.subscribeShowFormLink.click(() => {
            this.step1()
        })

        this.subscribeButton.click(() => {
            this.step0()
        })

        this.nextButtonStep1.click(() => {
            if (this.phoneIsValid)
                this.step2()
        })
        this.nextButtonStep2.click(() => {
            if (this.isOtpValid())
             this.finish()
        })

        this.showMore = (e,obj,link) => {
            e.preventDefault();
            if (!obj.hasClass('active')) {
                obj.addClass('active');
                setTimeout(() => obj.addClass('shown'), DEFAULT_ANIMATION_DELAY_START)
                link.addClass('active');
                link.find('.more').hide();
                link.find('.less').show();
                return
            }
            obj.removeClass('shown');
            setTimeout(() => obj.removeClass('active'), DEFAULT_CSS_ANIMATION_DELAY)
            link.removeClass('active');
            link.find('.more').show();
            link.find('.less').hide();
        }

        // Read more bind
        this.readMoreStep1.click((e) => this.showMore(e, this.disclaimerStep1, this.readMoreStep1))
        this.readMoreStep2.click((e) => this.showMore(e, this.disclaimerStep2, this.readMoreStep2))

        this.readMoreStep1.find('.less').hide();
        this.readMoreStep2.find('.less').hide();

        this.phone.inputmask();
        this.phone.keyup((e) => {
            if ((e.target.value || '').replace(/[_-]/g, '').length === 11) {
                this.nextButtonStep1.removeClass('inactive');
                this.phoneStatus.addClass('active');
                this.phoneIsValid = true;
                return
            }
            this.nextButtonStep1.addClass('inactive');
            this.phoneStatus.removeClass('active');
            this.phoneIsValid = false;
        })

        this.otpCode.map(code => {
            code.inputmask()
            code.keyup((e) => {
                if (this.isOtpValid()) {
                    this.nextButtonStep2.removeClass('inactive');
                    this.otpActions.addClass('active');
                    return
                }
                this.nextButtonStep2.addClass('inactive');
            })
        })

        this.step1ReturnLink.click((e) => {
            e.preventDefault();
            this.step1();
        })

        this.resendCode.click((e) => {
            e.preventDefault();
            setTimeout(() => this.showMessage(SUCCESSFULLY_RESEND), DEFAULT_ANIMATION_DELAY_START);
        })
    }

    this.isOtpValid = () => {
        return this.otpCode.filter(code => code.val().trim() === '' ).length === 0
    }

    this.step0 = () => {
        this.homeContainer.hide();
        this.subscribeHeader.show();
        this.subscribeFooter.hide();
        this.subscribeShowFormLink.show();
        this.subscribeStep1.hide();
        this.subscribeStep2.hide();
    }

    this.step1 = () => {
        this.homeContainer.hide();
        this.subscribeHeader.show();
        this.subscribeFooter.show();
        this.subscribeStep1.show();
        this.subscribeStep2.hide();
    }

    this.step2 = () => {
        this.homeContainer.hide();
        this.subscribeHeader.show();
        this.subscribeFooter.show();
        this.subscribeStep1.hide();
        this.subscribeStep2.show();
        this.otpCode.map(code => code.val(''));
        this.nextButtonStep2.addClass('inactive');
        this.otpActions.removeClass('active');
    }

    this.finish = () => {

        this.homeContainer.show();
        this.subscribeHeader.hide();
        this.subscribeFooter.hide();
        this.subscribeStep1.hide();
        this.subscribeStep2.hide();
        this.subscribeShowFormLink.hide();
        setTimeout(() => this.showMessage(SUCCESSFULLY_MESSAGE), DEFAULT_ANIMATION_DELAY_START);
    }

    this.showMessage = (message) => {
        this.subscribeMessage.find('.attention-box').find('span').hide();
        this.subscribeMessage.find('.attention-box').find('#' + message).show();
        this.subscribeMessage.show()
        setTimeout(() => {
            $(this.subscribeMessage).addClass('shown');
            setTimeout(() => {
                $(this.subscribeMessage).removeClass('shown');
                setTimeout(() => this.subscribeMessage.hide(), DEFAULT_CSS_ANIMATION_DELAY);
            }, DEFAULT_BANNER_DELAY)
        }, DEFAULT_CSS_ANIMATION_DELAY);

    }

    this.init();
}


$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        margin: 0,
        nav: true,
        dots: true,
        navigation: true,
        navText: ["<img src='/img/arrow-back.svg'>","<img src='/img/arrow-forward.svg'>"]
    });

    window.subscriber = new Subscriber();
});


