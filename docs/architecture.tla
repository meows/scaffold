--------------------------------- MODULE clock ---------------------------------
EXTENDS Naturals

VARIABLES hr, min, sec

Init == 
    /\ hr \in 1..12
    /\ min \in 0..59
    /\ sec \in 0..59

Next == 
    \/ /\ sec' = (sec + 1) % 60
       /\ sec' = 0
       /\ min' = (min + 1) % 60
       /\ min' = 0
       /\ hr' = IF hr = 12 THEN 1 ELSE hr + 1
    \/ /\ sec' = (sec + 1) % 60
       /\ sec' # 0
       /\ min' = min
       /\ hr' = hr
    \/ /\ sec' = 0
       /\ min' = (min + 1) % 60
       /\ min' # 0
       /\ hr' = hr

Spec == Init /\ [][Next]_<<hr, min, sec>>

====