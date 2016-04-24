'use strict';
let nM = new bigInt(1);
const LOOP_I = 4;
const viewer = document.getElementById('div1');

bigInt.two = new bigInt(2);

(function (){	
	const div2 = document.querySelector('#div2');	
	const tagNames = ['a1','a2','a3','a4'];
	document.querySelector('#div1').addEventListener('click',function (evn){
		//console.log(evn.target.getAttributeNode('g'));		
		if(tagNames.includes(evn.target.tagName.toLowerCase())){
			let str = [];
			let gap = new bigInt(evn.target.getAttribute('g'));			
			str.push('gap : ');
			str.push(gap.toString());
			str.push(' [');
			str.push(C(gap));
			str.push(']<br>')

			let pg = nM.add(gap),mg = nM.subtract(gap);

			switch(evn.target.tagName.toLowerCase()){
				case 'a1' :
					str.push('  p : ');
					str.push(pg.toString());
					str.push(' [');
					str.push(C(pg));
					str.push(']<br>');
					str.push('  m : ');
					str.push(mg.toString());
					str.push(' [');
					str.push(C(mg));
					str.push(']');
					break;
				case 'a2' :
					str.push('  p : ');
					str.push(pg.toString());
					str.push(' [');
					str.push(C(pg));
					str.push(']<br>');
					str.push('  m : ');
					str.push(mg.toString());
					str.push(' [');
					str.push(mg.toString());
					str.push('^1]');
					break;
				case 'a3' :
					str.push('  p : ');
					str.push(pg.toString());
					str.push(' [');
					str.push(pg.toString());
					str.push('^1]<br>');
					str.push('  m : ');
					str.push(mg.toString());
					str.push(' [');
					str.push(C(mg));
					str.push(']');
					break;
				case 'a4' :
					str.push('  p : ');
					str.push(pg.toString());
					str.push(' [');
					str.push(pg.toString());
					str.push('^1]<br>');
					str.push('  m : ');
					str.push(mg.toString());
					str.push(' [');
					str.push(mg.toString());
					str.push('^1]');
					break;
				default: break;

			};

			div2.style.visibility = 'visible';
			div2.innerHTML = str.join('');
		}
	},false);

	div2.addEventListener('click',(() => {
		div2.style.visibility = 'hidden';
	}),false);

})();


(function (){
	let p = new bigInt(3);
	for(let i = 0; i < LOOP_I; ){

		if(p.isPrime()){

			nM = nM.multiply(p);

			i++;

		}

		p = p.next();

	}

	setTimeout(function (){

			B(nM,bigInt.two);

	},1);

})();


function B(n,b){

	if(b.compare(n) < 0){

		let pM = n.add(b),mM = n.subtract(b);

		let tp = pM.isPrime() ? (mM.isPrime() ? 4 : 3 ) : (mM.isPrime() ? 2 : 1);

		let el =document.createElement("a"+tp);
		//el.setAttribute("g",b.toString());

		viewer.appendChild(el);
		
		setTimeout(() => {
			b = b.add(bigInt.two);
			B(n,b);
		},1);

	} 

}


function C(n){

	let t1 = bigInt.one,
		t2,t4 = bigInt.zero;
	let nP = true;
	let str = [];

	if(n.compare(1) <= 0){
		return '';
	}

	while(n.isEven() && (!n.isZero())){
		t4 = t4.next();
		n = n.divide(2);
	}

	if( t4.compare(bigInt.zero) > 0){
		str.push( '2^' + t4.toString());
	};

	if(n.compare(bigInt.two) === 0){
		return str[0];
	}

	if(n.isPrime()){
		str.push( n.toString() + '^1');
	} else {

		do{

			if(t1.isPrime()){

				t4 = bigInt.zero;
				t2 = n.divmod(t1);

				while(t2.remainder.isZero()){
					n = t2.quotient;
					t2 = n.divmod(t1);
					t4 = t4.next();
				};

				if( t4.compare(0) > 0){
					str.push( t1.toString() + '^' + t4.toString());
				}

				if(n.isPrime()){
					str.push( n.toString() + '^1');
					nP = false;
					break;
				}

			}

			t1= t1.add(bigInt.two);

		}while( nP && t1.compare(n) <= 0);

	}

	return str.join('*');

}
