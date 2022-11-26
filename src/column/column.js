import Task from '../task/task'
import styles from './column.module.sass'

function Column({columnName, columnId, columnTasks, columnColor}) {
  return (
    <div className={styles.column} data-column={columnId}>
        <div className={styles.column__title}>
          {columnName}
          <span className={styles.column__line} style={{backgroundColor: columnColor}}></span>
        </div>
        {
            columnTasks.map(({id, title, tags, desc}) => <Task key={id} title={title} tags={tags} desc={desc} />)
        }
    </div>
  )
}

export default Column