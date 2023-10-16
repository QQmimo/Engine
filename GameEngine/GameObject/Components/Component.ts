export class Component {

}

export class Component1 extends Component {
    public logger = (message: string): void => {
        console.log(message);
    }
}

export class Component2 extends Component {
    public Name: string;

    public setName = (name: string): void => {
        this.Name = name;
    }
}