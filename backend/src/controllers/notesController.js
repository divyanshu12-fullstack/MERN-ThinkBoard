import Note from "../../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in get all notes controller", error);
        res.status(500).json("Internal Server Error");
    }
}

export async function getNoteById(req, res) {
    try {
        const fetchedNote = await Note.findById(req.params.id);
        if (!fetchedNote) return res.satus(404).json({ message: "Note not found" });
        res.status(200).json(fetchedNote);
    } catch (error) {
        console.error("Error in getNoteById Controller", error);
        res.status(500).json("Internal server error");
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server Error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note Updated Successfully", note: updatedNote });
    } catch (error) {
        console.error("Error in Updating Note", error);
        res.status(500).json({ message: "Internal server Error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note Deleted Successfully", note: deletedNote });
    } catch (error) {
        console.error("Error in Deleting Note", error);
        res.status(500).json({ message: "Internal server Error" });
    }
}   