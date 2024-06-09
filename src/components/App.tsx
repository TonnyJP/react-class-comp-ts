import React from "react"
import { Todo, fetchTodos, deleteTodo } from "../actions"
import { StoreState } from "../reducers";
import { connect } from "react-redux";


interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: Function // typeof deleteTodo;
}

interface AppState {
    fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = { fetching: false }
    }

    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false })
        }
    }
    onFetchClicked = (): void => {
        this.props.fetchTodos();
        this.setState({ fetching: true })
    }

    onTodoClick = (id: number) => {
        this.props.deleteTodo(id)
    }

    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
                {todo.title}
            </div>
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.onFetchClicked}>Fetch</button>
                {this.state.fetching ?
                    <div>LOADING</div> : null
                }
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState): StoreState => {
    return { todos: state.todos }
}

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App)
