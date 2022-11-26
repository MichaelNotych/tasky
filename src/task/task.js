import TaskTemplate from './task-template'
import styles from './task.module.sass'

function Task({id, title, tags, desc}) {
  return (
    <div className={styles.task}>
        <ul className={styles.task__tags}>
            {
                tags.map(({name, color}, i) => 
                <li 
                className={styles.task__tag} 
                key={i} 
                style={{backgroundColor: color}}>
                    {name}
                </li>
                )
            }
        </ul>
        <div className={styles.task__title}>{title}</div>
        <div className={styles.task__desc}>{desc}</div>
        <TaskTemplate id={id} title={title} tags={tags} desc={desc}/>
    </div>
  )
}

export default Task