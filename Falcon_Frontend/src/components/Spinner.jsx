import { ThreeCircles } from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>

      <ThreeCircles
        height="60"
        width="60"
        color="#181a1f"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
      <p className='text-lg text-center px-4'>{message}</p>
    </div>
  )
}

export default Spinner
