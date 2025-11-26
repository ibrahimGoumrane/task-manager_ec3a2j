const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
        Welcome to Task Manager!
      </h1>
      <p className="text-base md:text-lg text-gray-600 text-center max-w-lg mx-auto leading-relaxed">
        Your simple and efficient way to manage your tasks and boost productivity.
      </p>
    </div>
  );
};

export default Home;