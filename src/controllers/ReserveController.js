import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";

class ReserveController{

    async index(req, res){
        const { user_id } = req.headers;

        const reserves = await Reserve.find({ user: user_id});

        return res.json(reserves);
    }

    async store(req, res){
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house =  await House.findById(house_id);

        if(!house){
            return res.status(400).json({ error: "Casa nao encontrada!" });
        }

        if(house.status !== true){
            return res.status(400).json({ error: "Casa nao disponivel!" });
        }

        const user = await User.findById(user_id);
        if(String(user._id) === String(house.user)){
            return res.status(401).json({ error: "Reserva nao permitida!" });
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        await reserve.populate(["house", "user"]);

        return res.json(reserve);
    }

    async destroy(req, res){
        const { reserve_id } = req.body;

        await Reserve.findByIdAndDelete({ _id: reserve_id });

        return res.send();
    }

}

export default new ReserveController();