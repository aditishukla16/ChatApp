const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center p-12"
      style={{
        backgroundImage: `url('/background.jpg')`, // 👈 change to your image path
      }}
    >
      <div className="bg-white/80 p-8 rounded-xl text-center max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
