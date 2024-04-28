import styles from './search.module.scss'
const SearchInput = () => {
  return (
    <div className={styles.search_container}>
        <input type="search" className={styles.search} placeholder='search by city here...'/>
    </div>
  )
}

export default SearchInput