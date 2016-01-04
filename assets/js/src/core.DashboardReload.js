// Dashboard Reload
function DashboardReload() {

	// Initalize vars
	var _this = this;	
        
        userInputs = null;

        var bum2value = {
            "Man" : 80,
            "Woman" : 160,
            "Boy" : 240,
            "Girl" : 320,
            "Infant" : 400
        };
        
        var luggage2value = {
            "minimalist":0,
            "lugger" : 180,
            "light-packer": 270,
            "big-loader" : 90
        }
        
        var speed2value = {
            1:0,2:-80,3:-160,4:-240,5:-320
        }
        
        
	/**
	 * BUMS ON SEATS
	*/
	this.bums = function() {
		var $list = $( '#c-bums .roller .list' );
                
                if(!this.userInputs) return false;
                
		var selectedBums = this.userInputs.seats;
                $list.each( function( i, val ) {
                    if(bum2value[selectedBums[i]] !== 'undefined'){
                        $(val).find('.item').removeClass('active');
                        $(val).next().simulate('drag');
                        $(val).find('.item').filter('[data-value="'+selectedBums[i]+'"]').addClass('active')
                        var slotHeight = bum2value[selectedBums[i]];
                        if(i==0) slotHeight = slotHeight-80;
                        
                        setTimeout( function() {
                                TweenMax.to( val, 0.4, {
                                        y: -slotHeight,
                                        repeat: 1,
                                        yoyo: false,
                                });
                        }, 0 );
                    }
                });
	};
        
        this.mpg = function() {
            
            if(!this.userInputs) return false;
            
            var $wrap = $('.control.mpg');
            var $arrow = $('.control.mpg .arrow');
            var $value = $('.control.mpg .value');           
            var selectedMpg = this.userInputs.mpg;

            var mpg_bounds  = 120;
            var mpg_steps   = 13;
            var mpg_min     = 25;
            var mpg_max     = 80;
            var mpg_snap    = 360 / 18;
            var diff        = mpg_max - mpg_min;
            var rotation    = ((selectedMpg - mpg_min)/diff) * (mpg_bounds * 2) - mpg_bounds;
            
            var $arrow = $('.control.mpg .arrow');
            
            var counter = this.getMpgCounter();
            
            $('#mpg_value').text(selectedMpg);
            
            TweenLite.to( $arrow, 0.5, {
              rotation: rotation,
              onComplete: function() { 
                  $arrow.simulate('drag');
              }
            }); 
            $wrap.addClass('scale-' + counter);
        }
        
        this.getMpgCounter = function(){
            var selectedMpg = this.userInputs.mpg;
            var counter = 0;
            switch(true){
                case selectedMpg >= 25 && selectedMpg <= 30: counter = 1; break;
                case selectedMpg >= 31 && selectedMpg <= 34: counter = 2; break;
                case selectedMpg >= 35 && selectedMpg <= 39: counter = 3; break;
                case selectedMpg >= 40 && selectedMpg <= 43: counter = 4; break;
                case selectedMpg >= 44 && selectedMpg <= 47: counter = 5; break;
                case selectedMpg >= 48 && selectedMpg <= 51: counter = 6; break;
                case selectedMpg >= 52 && selectedMpg <= 56: counter = 7; break;
                case selectedMpg >= 57 && selectedMpg <= 60: counter = 8; break;
                case selectedMpg >= 61 && selectedMpg <= 64: counter = 9; break;
                case selectedMpg >= 65 && selectedMpg <= 68: counter = 10; break;
                case selectedMpg >= 69 && selectedMpg <= 73: counter = 11; break;
                case selectedMpg >= 74 && selectedMpg <= 80: counter = 12; break;
                default: counter = 0; break;
                                
            }
            return counter;
        },
        
        this.options = function(){
            
            if(!this.userInputs) return false;
            
            var selectedOption = this.userInputs.options;
           
             setSelected = function(){ 
                $( '.control.options input' ).each( function( i, el ) {
                    var eid = $(el).attr('id');
                    if(selectedOption[eid]){
                        $( el ).addClass('checked');
                    }

                } );
            }
            
            setTimeout( setSelected,1500 );
        
        }
        
        this.price = function(){
            
            if(!this.userInputs) return false;
            
            var min		= 190;
            var max		= 300;				
            var range		= max - min;
            var price = this.userInputs.price;

            var height = (price - min) * (100/range);
            var $handle = $( '.control.price .handle' );
            var $bgColor = $( '.control.price .switch-bg' );
           
            var position = Math.abs( ( height / 100 ) * -390 );
            var colorPos = Math.abs(position) + 13;
            
            TweenMax.to( $handle, 0.5, {
                y: -position+"px",
                yoyo: false,
                repeat: false
            });
            //
            // Tween the color behind
            TweenMax.to( $bgColor, 0.5, {
                height: colorPos+"px",
                yoyo: false
            });

            
        }
        
        this.lifestyle = function(){
            if(!this.userInputs) return false;
            var value = this.userInputs.lifestyle;
            var $slickWrap = $('.items-wrapper');
            setTimeout(function(){
                if(value == 1)
                    $slickWrap.slick('slickPrev');
                else if(value==3)
                    $slickWrap.slick('slickNext');
                else if(value==4) {
                    $slickWrap.slick('slickNext');
                    setTimeout(function(){$slickWrap.slick('slickNext');},500);
                }
            },3000)
        }
        
        this.luggage = function(){
            if(!this.userInputs) return false;
            var value = this.userInputs.luggage;
            var $luggageDial = $( '.control.luggage .dial' );
            
//            TweenLite.to( $luggageDial, 2, {rotation: luggage2value[value]});
            if(luggage2value[value] == 270) $('#c-luggage #right').trigger('mouseup');
            if(luggage2value[value] == 180) $('#c-luggage #right').trigger('mouseup').trigger('mouseup');
            if(luggage2value[value] == 90) $('#c-luggage #left').trigger('mouseup');
            $('#c-luggage .dial').removeClass('minimalist').addClass(value);
        }
        
        this.speed = function(){
            if(!this.userInputs) return false;
            var value = this.userInputs.speed;
            
            var $list = $( '.control.speed .roller .list' );
            $('#speed .list').find('.item').each(function(){$(this).removeClass('active')});
            $('#speed .list').find('.item').filter('[data-value="'+value+'"]').addClass('active');
            setTimeout(function(){
                TweenMax.to( $list, 0.5, {
                        y: speed2value[value],
                        repeat: false,
                        yoyo: false,
                        onComplete:function(){
                            setTimeout(function(){
                                $('#speed .fake-list').simulate('drag');
                            },500);
                        }
                });
            },500);
            
        }
        
        this.handleMissing = function(userSelection){
            var oldInputs =  store.get( 'miniInput');
            
            if(!speedChanged && oldInputs){
                userSelection.speed = oldInputs.speed;
            }

            if(userSelection.mpg===undefined && oldInputs){
                userSelection.mpg = oldInputs.mpg;
            }

            if(!mpgChanged && oldInputs)
                userSelection.mpg = oldInputs.mpg;

            if(!priceChanged && oldInputs){
                userSelection.price = oldInputs.price;
            }

            if(!roller1Changed && oldInputs){
                userSelection.seats[0] = oldInputs.seats[0];
            }
            if(!roller2Changed && oldInputs){
                userSelection.seats[1] = oldInputs.seats[1];
            }
            if(!roller2Changed && oldInputs){
                userSelection.seats[1] = oldInputs.seats[1];
            }
            if(!roller3Changed && oldInputs){
                userSelection.seats[2] = oldInputs.seats[2];
            }
            if(!roller4Changed && oldInputs){
                userSelection.seats[3] = oldInputs.seats[3];
            }
            if(!roller5Changed && oldInputs){
                userSelection.seats[4] = oldInputs.seats[4];
            }

            return userSelection;
        }
        
        this.displayResult = function(){
            var car = store.get('carResult');
            if(car){
                if ( car.code === "RKT" ) {
                    $('#start').trigger('click');
                }else{
                    dashboardLogic.publishCar( car );
                }
            }
        }

        this.init = function(){
            this.userInputs = store.get('miniInput');
            this.bums();
            this.mpg();
            this.lifestyle();
            this.luggage();
            this.speed();
            this.price();
            this.options();
            this.displayResult();
        }

}
var dashRelod = new DashboardReload();
setTimeout(function(){
    dashRelod.init();
},2000);

$("#clearsession").click(function(){store.set('miniInput',null); store.set('carResult',null); alert("Current session has been destroyed."); });