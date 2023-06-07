import Card from './card';

const Cards = ({ cardImages }) => {
    return (
        <div className="grid grid-cols-5 gap-x-2 md:gap-x-8 lg:gap-x-16">
            {cardImages.map((cardImage) => {
                return <Card key={cardImage.id} {...cardImage} />;
            })}
        </div>
    );
};

export default Cards;
