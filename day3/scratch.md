
    // ASCII Codes
    // A (65-65)=0,      B (66-65)=1,   C (67-65)=2
    // X (88-65)%23=0,   Y (89-65)%23=1, Z (90-65)%23=2

    // 0 v 0 == tie
    // 0 v 1 == they loss
    // 0 v 2 == they win

    // 1 v 0 == win
    // 1 v 1 == tie
    // 1 v 2 == loss

    // 2 v 0 == loss
    // 2 v 1 == win
    // 2 v 2 == tie

    // Rock      1  A   X
    // Paper     2  B   Y
    // Scissors  3  C   Z

    // Win  6
    // Draw 3
    // Loss 0

    // A Y > 2 + 6 =  8
    // B X > 1 + 0 =  1
    // C Z > 3 + 3 =  6
    //             = 15
    // A X > 1 + 3 =  4
    //             = 19
    // A Z > 3 + 0 = 22
    //

Part 2

    // Rock      1  A   X
    // Paper     2  B   Y
    // Scissors  3  C   Z

    // Loss X  0
    // Draw Y  3
    // Win  Z  6

    // A Y > 1 (Rock) + 3 =  4
    // B X > 1 (Rock) + 0 =  1
    // C Z > 1 (Rock) + 6 =  7
    //                    = 12

    if Y then same value
    if X take the value and determine a loss aka (them + 1) % 3
    if Z take the value and determine a win (them + 2) % 3

    // They Lose
    else if ((them + 1) % 3 === you) {
        sum += 6;
    }

    // They Win
    else if ((them + 2) % 3 === you) {
        sum += 0;
    }

    // X means you intend to lose
    // Y means you intend to draw
    // Z means you intend to win