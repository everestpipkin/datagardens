# Memory palace functions 
# ___________________________________________

# rooms that aren't used
workinprogress=("/Users/cbroms/Desktop/memory-palace/living-room/downstairs/bedroom/closet" "/Users/cbroms/Desktop/memory-palace/living-room/downstairs/bedroom/bathroom" "/Users/cbroms/Desktop/memory-palace/kitchen/pantry")

# check if array contains a value
# https://stackoverflow.com/a/14367368
contains () { 
    local array="$1[@]"
    local seeking=$2
    local in=1
    for element in "${!array}"; do
        if [[ $element == $seeking ]]; then
            in=0
            break
        fi
    done
    return $in
}

# "enter" a room, first checking that we can 
enter() {
    clear && cd "$@" && contains workinprogress $PWD && open "/Users/cbroms/Desktop/scary-martha.jpg" || cat room
}
export -f enter

# "leave" a room 
leave() {
    clear && cd .. && 
    if [ $PWD = "/Users/cbroms/Desktop" ]; then
        open "bye.jpg"
    else 
        cat room 
    fi
}
export -f leave

clean() {
    open "martha.jpg"
}
export -f clean

alias go='enter'
alias washwindows='clean'
alias cleanstove='clean'
alias cleanlitterbox='clean'
alias changesheets='clean'
alias polishsilver='clean'