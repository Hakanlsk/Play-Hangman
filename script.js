const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('succes-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message'); 
const PlayAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord(); 


//rastgele kelime getiren metot
function getRandomWord() {
    const words = ["esek", "kopek", "klavye", "araba", "fare", "honda", "ankara", "erzurum", "kacakcay" ];
    return words[Math.floor(Math.random()*words.length)]; //random index üretimi
}

//seçilen kelimenin harflerini kutucuklara yerleştirme
function displayWord(){
    
    //harflerin kullanıcaya gösterilip gösterilmemesi
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''} 
            </div>
        `).join('')}
    `;
    // Kazandınız Kutucuğu için kodlar
    const w = word_el.innerText.replace(/\n/g,'');
    if(w === selectedWord){
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandınız';
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0? '<h3>Htalı Harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;
    //hatalı harf girildikçe adamın asılmasını sağlayan kod
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if(index<errorCount) {
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
    //hatalı harf sayısı toplam item sayısına eşitse adam asılmış oyun kaybedilmiş olur 
    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz..';
    }

}
//bu harfi zaten girdiniz uyarısının ekrandan bir süre sonra kaybolmasını sağlamak için fankşın :d
function displayMessage(){
    message.classList.add('show');

    setTimeout(function() {
        message.classList.remove('show');
    }, 1500)
}

PlayAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
})


window.addEventListener('keydown', function(e) {
    if(e.keyCode >= 65 && e.keyCode <= 90 ){  // A ve Z harfleri arasındakileri aldı
        const letter = e.key;

        //girilen harf kelimede varsa correctLetters ' dizisine eklenir
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){   //girilen harf listede yoksa ekleyelim yoksa eklemeyelim
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
                message.classList.add('show');  //girilen doğru harf tekrar girildiğinde ekrana bu harfi girdiniz çıktsı için
            }
        }else{  //girilen harf kelimede yoksa yanlış girilen harfler(wrong letters) ksımına eklenir
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }

    }    
    
});




displayWord();
































