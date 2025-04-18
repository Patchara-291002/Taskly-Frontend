import styles from '@/app/component/Loading.module.css'

export default function Loading() {
  return (
    <div
        className='w-full h-screen fixed inset-0 flex items-center justify-center'
    >
      <div className={styles.loader}/>
    </div>
  )
}
