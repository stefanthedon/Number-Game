        var randomNumber = Math.floor(Math.random() * 100) + 1;
        
        var guesses = document.querySelector('.guesses');
        var lastResult = document.querySelector('.lastResult');
        var lowOrHi = document.querySelector('.lowOrHi');
        
        var guessSubmit = document.querySelector('.guessSubmit');
        var guessField = document.querySelector('.guessField');
        
        var guessCount = 1;
        var resetButton;

        function validate(evt) {
            var theEvent = evt || window.event;
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode (key);
            var regex = /[0-9]|\./;
            if( !regex.test(key) ) {
                theEvent.returnValue = false;
                if (theEvent.preventDefault) theEvent.preventDefault();
                lastResult.textContent = 'Please Enter a Number';
                lastResult.style.backgroundColor = 'red';   
            }
        }
        
        

        

        function checkGuess() {
            
            
            
            var userGuess = Number(guessField.value);
            
            if (document.getElementById('guessField').value === '') {
//                alert('Please Enter a Value');
                lastResult.textContent = 'Please Enter a Value';
                lastResult.style.backgroundColor = 'red';
                return false;
            }
            
            if (document.getElementById('guessField').value > 100) {
//                alert('Please Enter a Number Between 0 and 100!!!');
                lastResult.textContent = 'Please Enter a Number Between 0 and 100!!!';
                lastResult.style.backgroundColor = 'red';
                return false;
            }
            
            if (guessCount === 1) {
                guesses.textContent = 'Previous guesses: ';
            }
            guesses.textContent += userGuess + ' ';
            
            if (userGuess === randomNumber) {
                lastResult.textContent = 'Congratulations!!! You got it right!!!';
                lastResult.style.backgroundColor = 'green';
                lowOrHi.textContent = '';
                setGameOver();
            }else if (guessCount === 10) {
                lastResult.textContent = '!!! GAME OVER !!!';
                setGameOver();
            }else {
                lastResult.textContent = 'Wrong!';
                lastResult.style.backgroundColor = 'red';
                if (userGuess < randomNumber) {
                    lowOrHi.textContent = 'Last guess was too low!';
                }else if (userGuess > randomNumber) {
                    lowOrHi.textContent = 'Last guess was too high!';
                }
            }
            
            guessCount++;
            guessField.value = '';
            guessField.focus();

        }
        
//        guessSubmit.addEventListener('click', checkGuess);
        
        function setGameOver() {
            guessField.disabled = true;
            guessSubmit.disabled = true;
            resetButton = document.createElement('button');
            resetButton.textContent = 'Start New Game';
            resetButton.style.position = 'absolute';
            resetButton.style.padding = '8px';
            resetButton.style.fontFamily = 'Raleway';
            resetButton.style.fontSize = '20px';
            resetButton.style.fontWeight = '600';
            resetButton.style.width = '40%';
            resetButton.style.border = '2px solid #000';
            resetButton.style.borderRadius = '10px';
            resetButton.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            resetButton.style.marginLeft = '30%';
            resetButton.style.marginRight = '30%';
            resetButton.style.marginTop = '20px';
            document.body.appendChild(resetButton);
            resetButton.addEventListener('click', resetGame);
        }

function resetGame() {
    guessCount = 1;
    
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    
    resetButton.parentNode.removeChild(resetButton);
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'white';
    
    randomNumber = Math.floor(Math.random() * 100) + 1;
}