import styles from './search.module.scss'
const SearchInput = () => {
  return (
    <div className={styles.search_container}>
        <input type="search" className={styles.search} />
    </div>
  )
}

export default SearchInput