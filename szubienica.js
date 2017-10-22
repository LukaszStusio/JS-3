var haslo = "Bez pracy nie ma kołaczy";

haslo = haslo.toUpperCase();


var dlugosc = haslo.length;
var ile_skuch = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var haslo1 = "";

for (i=0; i<dlugosc; i++)
{
	if (haslo.charAt(i)==" ") haslo1 = haslo1 +" ";
	else haslo1 = haslo1 +"-";
	
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

function start()
{
	var tresc_diva = "";
	
	for (i=0; i<=34; i++)
	{
		var element = "lit" +i;
		
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if ((i+1) % 7 ==0) /*operator modulo %, czyli reszta z dzielenia, tutaj przez 7 */tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
/*dodaję do klasy String nową (prototype) funkcję o nazwie ustawZnak, której mi brakuje a której producent tak jakby nie przewidział */
{
	if (miejsce > this.length -1) return this.toString(); /*test, zapobiega żądaniu podmianki znaku w łańcuchu, jeśli ten się już skończył, np. podmień mi znak 10 gdy łąńcuch ma tylko 6 znaków (byłby problem z żądaniem dostępu do pamięci która nie jest zarezerwowana dla tematu) return.ths*/ 
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

	function sprawdz(nr)
	{
		var trafiona = false;
		
		for(i=0; i<dlugosc; i++)
		{
			if(haslo.charAt(i) == litery[nr])
			{
				/*alert(i);*/
				/*haslo1.charAt(i) = litery[nr]; taki zapis wywali error: invalid left hand side cośtam assigment w konsoli, funkcja charAt w tej postaci dokonuje odczytu a nie zapisu, potrzebna nowa funkcja stworzona od zera: patrz String.prototype... */
				haslo1 = haslo1.ustawZnak(i,litery[nr]);
				
				trafiona = true;
			}
		}
		/*wypisz_haslo(); funkcję przenosimy do if true, bo tylko wtedy powinna pojawić się tam trafiona litera*/
		
		if (trafiona ==true)
		{
			yes.play()
			
			var element = "lit" + nr; /*to daje nam id klikniętego diva z literą */
			document.getElementById(element).style.background = "#003300"; /*zmiana koloru klikniętego diva */
			document.getElementById(element).style.color = "#00c000"; /*zmiana koloru czcionki klikniętego diva */
			document.getElementById(element).style.border = "3px solid #00c000"; /*zmiana koloru border klikniętego diva */
			document.getElementById(element).style.cursor = "default"; /*zmiana wskaźnika na domyślną strzałkę klikniętego diva */
			wypisz_haslo();
		}
		else
		{
			no.play()
			
			var element = "lit" + nr;
			document.getElementById(element).style.background = "#330000"; 
			document.getElementById(element).style.color = "#c00000"; 
			document.getElementById(element).style.border = "3px solid #c00000"; 
			document.getElementById(element).style.cursor = "default";
			
			document.getElementById(element).setAttribute("onclick",";"); //zmiana atrubutu z onclicka na pustą instrukcję
			
			//skucha
			ile_skuch++;
			var obraz = "img/s"+ ile_skuch + ".jpg";
			document.getElementById("szubienica").innerHTML = 	'<img src="'+obraz+'" alt="" />';	 
		}
		
		//wygrana
		if(haslo == haslo1)
			document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
		
		//porażka
		if(ile_skuch>=9)
			document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
		
	}