const submitForm = () => {
    const regex = new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    );
    const value = document.getElementById("input").value;
    if (value.match(regex)) {
        document.getElementById("submit").innerHTML = "please wait...";
        document.location.href = `/poem?page=${value}`;
    } else {
        alert("enter a url please");
    }
};
