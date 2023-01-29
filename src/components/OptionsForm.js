function OptionsForm({ gameOptions, handleChange, startGame }) {
  return (
    <form>
      <label htmlFor="num-questions">
        Number of Questions
        <select
          id="num-questions"
          value={gameOptions.amount}
          onChange={handleChange}
          name="amount"
        >
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>
      <label htmlFor="category">
        Question Category
        <select
          id="category"
          value={gameOptions.category}
          onChange={handleChange}
          name="category"
        >
          <option value="">All</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals and Theater</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="31">Entertainment: Japanese Anime and Mange</option>
          <option value="32">Entertainment: Cartoons and Animations</option>
          <option value="29">Entertainment: Comics</option>
          <option value="17">Science and Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="30">Science: Gadgets</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
        </select>
      </label>
      <label htmlFor="difficulty">
        Difficulty
        <select
          id="difficulty"
          value={gameOptions.difficulty}
          onChange={handleChange}
          name="difficulty"
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </form>
  );
}
export default OptionsForm;
