import Column from '../column';
import styles from './app.module.sass'
import {ReactComponent as ReactLogo} from './logo.svg';

function App({ tasks }) {
  return (
    <div className={styles.dashboard}>
      <ReactLogo className={styles.dashboard__logo}/>
      <h1 className={styles.dashboard__title}>My Dashboard</h1>
      <div className={styles.dashboard__table}>
        <div className={styles.dashboard__space}></div>
        {
          Object.keys(tasks).map(columnId => {
            const { color, tasks: tasksArray, name } = tasks[columnId];
            return (
              <Column key={columnId} columnName={name} columnId={columnId} columnTasks={tasksArray} columnColor={color}/>
            )
          })
        }
        <div className={styles.dashboard__space}></div>
      </div>
      <div className={styles.dashboard__noactionlayer}></div>
    </div>
  );
}

export default App;
