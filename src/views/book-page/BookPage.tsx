import './BookPage.css'
import mockbook from '../../assets/mockbook.jpg'
import InfoBlock from "../../components/info-block/InfoBlock";

export default function BookPage() {
    const isLoading = false;
    const error = false;

    return (
        <div className="bookPg">
            {isLoading || error ? (
                <InfoBlock isLoading={isLoading} error={error}/>
            ) : (
                <>
                    <div className="bookSection">
                        <div className="imgCont">
                            <img alt="MockBook" className="bookImg" src={mockbook}/>
                        </div>
                    </div>
                    <div className="descriptionSection">
                        <h2>Крутое hdhdбольшое название на чето важное тема философия пам парам бадум бум бум</h2>
                        <h3 className="authorName">Какой то важный мужик</h3>
                        <section className="bookDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at feugiat tellus. Quisque vehicula eros non tortor dictum, quis hendrerit odio interdum. Nullam bibendum odio vel lorem volutpat, a hendrerit urna auctor. In congue velit libero, eget rhoncus nunc bibendum et. Fusce id laoreet nulla. Integer bibendum ipsum ut augue fringilla, non rhoncus elit varius. Donec a tristique nulla. Vestibulum eleifend dolor vel nisi vehicula bibendum. Nullam congue sapien a magna laoreet, a vehicula est interdum. Vestibulum finibus hendrerit libero, et egestas libero pharetra ac. Nulla facilisi. Nam viverra ante a justo viverra, at fermentum est feugiat.

                            Proin at tincidunt metus, ac vulputate libero. Fusce euismod, risus eu posuere convallis, metus justo venenatis neque, id blandit risus sapien vel arcu. Integer ultrices tincidunt ante, non eleifend quam elementum a. Etiam ut tortor id est blandit malesuada. Nulla eget ante non justo mattis lacinia. Fusce vel felis sed turpis consectetur posuere vel eget lectus. Sed ut volutpat mauris, et elementum erat. Vivamus laoreet tellus ut tellus tincidunt, eget blandit elit dapibus. Pellentesque egestas ante a odio dictum, sit amet aliquet lectus volutpat.

                            Vestibulum vel urna ullamcorper, bibendum felis ac, hendrerit metus. Nulla facilisi. Nulla eget sapien laoreet, malesuada elit id, hendrerit dolor. Praesent nec augue in augue venenatis finibus. Curabitur et ante nec quam ultricies fermentum non ut tellus. Nullam a felis in metus gravida dignissim. Fusce condimentum, nisi quis consectetur sollicitudin, velit purus venenatis mauris, nec viverra mi neque sit amet orci. Nullam a odio venenatis, venenatis lectus nec, tristique dolor. Vivamus bibendum scelerisque dui, vel feugiat nulla ullamcorper vel. Fusce finibus turpis id hendrerit pellentesque. Pellentesque suscipit tortor ut metus euismod, eu rhoncus leo vestibulum.

                            Nunc venenatis eget tellus non dignissim. Ut non aliquet sapien, eu commodo metus. Maecenas pharetra dignissim quam, et tempus mauris ullamcorper ac. Sed lacinia, ante id egestas mattis, neque justo varius arcu, sit amet finibus nunc dolor ac purus. Sed tincidunt odio vel volutpat congue. Etiam eu lacinia tortor. Sed id quam et lectus tempor tristique. Nulla facilisi. Integer placerat nunc et elit aliquet varius. Aliquam erat volutpat.

                            Praesent luctus malesuada malesuada. Nullam eget justo id justo malesuada vestibulum. In tristique, metus nec vehicula convallis, metus ante lacinia libero, eu varius libero odio a est. Vivamus dapibus sit amet ligula nec hendrerit. Vivamus congue lectus sed eros pharetra, eu laoreet ex interdum. Maecenas hendrerit cursus arcu, vel elementum ipsum. Donec eu tellus dolor. Quisque malesuada ex nec ante commodo bibendum. Donec ac libero a dolor suscipit bibendum nec et mi. Sed bibendum, nunc nec gravida suscipit, dui libero dignissim elit, vel pellentesque ipsum nisi eu arcu.

                            Integer et nunc a urna varius fringilla ut sed odio. Sed bibendum risus et justo congue, id placerat justo malesuada. Vestibulum sollicitudin sapien a magna mattis, ut tincidunt elit ultrices. In eget lacinia massa. Duis ullamcorper turpis sit amet augue efficitur, ac suscipit velit tristique. Integer non vehicula turpis, et feugiat dolor. Etiam quis feugiat erat, non condimentum nisl. Vivamus lacinia dolor ut vestibulum tristique. Donec mattis ligula in quam euismod, vel congue leo luctus. Nulla id hendrerit turpis, vitae tristique libero.

                            Pellentesque euismod, augue et ultrices hendrerit, velit ligula tincidunt odio, at lacinia ex turpis nec nisl. Fusce nec vehicula mauris. Integer laoreet bibendum metus a pellentesque. Suspendisse potenti. Nam in urna non erat vehicula cursus. Sed ac varius elit. Suspendisse vulputate velit quis justo tristique, ut lacinia risus viverra. Suspendisse potenti. Vestibulum tempor, libero eu hendrerit vestibulum, tellus ex tincidunt massa, euismod bibendum dolor nulla nec odio.
                        </section>
                    </div>
                </>
                )}
        </div>
    );
}