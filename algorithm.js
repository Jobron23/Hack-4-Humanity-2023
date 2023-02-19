function scoreAlgorithm() {
			
    let diff = 8.75-pH;
    diff = Math.abs(diff);
    let score1 = 10-diff;

    let score2 = 0;
    if(turbidity <= 5){
        score2 = 10;
    }
    else if(turbidity <= 40){
        score2 = 8;
    }
    else if(turbidity <= 80){
        score2 = 5;
    }
    else if(turbidity <= 120){
        score2 = 3;
    }

    let score3 = 2;
    if(disolved_oxygen >= 6.5 && disolved_oxygen <= 11){
        score3 = 5;
    }
    else if(disolved_oxygen < 6.5 && disolved_oxygen >= 3){
        score3 = 2.5;
    }
    else if(disolved_oxygen > 11){
        score3 = 3;
    }

    let finalScore = (score1 + score2 + score3)/2.5;
}
