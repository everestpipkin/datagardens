import DefaultLayout from "./layout/default.jsx";
const React = require("react");

class Summary extends React.Component {
    render() {
        let sentences = this.props.sentences.map((sent, i) => (
            <div className="line" key={i}>
                {sent}
            </div>
        ));

        return (
            <DefaultLayout title={this.props.title}>
                <h1>{this.props.title}</h1>
                <div>{sentences}</div>
            </DefaultLayout>
        );
    }
}

module.exports = Summary;
